"use client";

import { createContext, useReducer, useEffect, ReactNode } from "react";

type NotebookSidebarSettings = { disabled: boolean; isHoverOpen: boolean };
type NotebookSidebarState = {
  isOpen: boolean;
  isHover: boolean;
  settings: NotebookSidebarSettings;
};

type NotebookSidebarAction =
  | { type: "TOGGLE_OPEN" }
  | { type: "SET_IS_OPEN"; payload: boolean }
  | { type: "SET_IS_HOVER"; payload: boolean }
  | { type: "SET_SETTINGS"; payload: Partial<NotebookSidebarSettings> };

const initialState: NotebookSidebarState = {
  isOpen: true,
  isHover: false,
  settings: { disabled: false, isHoverOpen: false },
};

const notebookSidebarReducer = (
  state: NotebookSidebarState,
  action: NotebookSidebarAction
): NotebookSidebarState => {
  switch (action.type) {
    case "TOGGLE_OPEN":
      return { ...state, isOpen: !state.isOpen };
    case "SET_IS_OPEN":
      return { ...state, isOpen: action.payload };
    case "SET_IS_HOVER":
      return { ...state, isHover: action.payload };
    case "SET_SETTINGS":
      return { ...state, settings: { ...state.settings, ...action.payload } };
    default:
      return state;
  }
};

export const NotebookSidebarContext = createContext<
  | {
      state: NotebookSidebarState;
      toggleOpen: () => void;
      setIsOpen: (isOpen: boolean) => void;
      setIsHover: (isHover: boolean) => void;
      getOpenState: () => boolean;
      setSettings: (settings: Partial<NotebookSidebarSettings>) => void;
      settings: NotebookSidebarSettings;
      isOpen: boolean;
    }
  | undefined
>(undefined);

const loadStateFromLocalStorage = (): NotebookSidebarState => {
  try {
    const savedState = localStorage.getItem("notebookSidebarState");
    return savedState ? JSON.parse(savedState) : initialState;
  } catch (error) {
    console.error("Failed to load state from local storage", error);
    return initialState;
  }
};

export const NotebookSidebarProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    notebookSidebarReducer,
    loadStateFromLocalStorage()
  );

  useEffect(() => {
    try {
      localStorage.setItem("notebookSidebarState", JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save state to local storage", error);
    }
  }, [state]);

  const toggleOpen = () => {
    dispatch({ type: "TOGGLE_OPEN" });
  };

  const setIsOpen = (isOpen: boolean) => {
    dispatch({ type: "SET_IS_OPEN", payload: isOpen });
  };

  const setIsHover = (isHover: boolean) => {
    dispatch({ type: "SET_IS_HOVER", payload: isHover });
  };

  const getOpenState = () => {
    return state.isOpen || (state.settings.isHoverOpen && state.isHover);
  };

  const setSettings = (settings: Partial<NotebookSidebarSettings>) => {
    dispatch({ type: "SET_SETTINGS", payload: settings });
  };

  return (
    <NotebookSidebarContext.Provider
      value={{
        state,
        isOpen: state.isOpen,
        toggleOpen,
        setIsOpen,
        setIsHover,
        getOpenState,
        setSettings,
        settings: state.settings,
      }}
    >
      {children}
    </NotebookSidebarContext.Provider>
  );
};
