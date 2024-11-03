// This file is auto-generated by @hey-api/openapi-ts

export type HttpValidationError = {
    detail?: Array<ValidationError>;
};

export type NotebookGetResponse = {
    /**
     * The unique identifier of the notebook
     */
    id: string;
    /**
     * The name of the notebook
     */
    name: string;
    /**
     * The description of the notebook
     */
    description: string;
    /**
     * The date and time the notebook was created
     */
    createdAt: Date;
    /**
     * The date and time the notebook was last updated
     */
    updatedAt: Date;
    /**
     * The unique identifier of the user who owns the notebook
     */
    ownerId: string;
};

export type NotebookPostRequest = {
    /**
     * The name of the notebook
     */
    name: string;
    /**
     * The description of the notebook
     */
    description?: (string | null);
};

export type NotebookPostResponse = {
    /**
     * The unique identifier of the notebook
     */
    id: string;
    /**
     * The name of the notebook
     */
    name: string;
    /**
     * The description of the notebook
     */
    description: string;
    /**
     * The date and time the notebook was created
     */
    createdAt: Date;
    /**
     * The date and time the notebook was last updated
     */
    updatedAt: Date;
};

export type NotebooksGetResponse = {
    /**
     * The list of notebooks
     */
    notebooks: Array<NotebookGetResponse>;
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type ListNotebooksNotebooksGetResponse = (NotebooksGetResponse);

export type ListNotebooksNotebooksGetError = unknown;

export type CreateNewNotebookNotebooksPostData = {
    body: NotebookPostRequest;
};

export type CreateNewNotebookNotebooksPostResponse = (NotebookPostResponse);

export type CreateNewNotebookNotebooksPostError = (HttpValidationError);

export type RootGetResponse = (unknown);

export type RootGetError = unknown;

export type ListNotebooksNotebooksGetResponseTransformer = (data: any) => Promise<ListNotebooksNotebooksGetResponse>;

export type NotebooksGetResponseModelResponseTransformer = (data: any) => NotebooksGetResponse;

export type NotebookGetResponseModelResponseTransformer = (data: any) => NotebookGetResponse;

export const NotebookGetResponseModelResponseTransformer: NotebookGetResponseModelResponseTransformer = data => {
    if (data?.createdAt) {
        data.createdAt = new Date(data.createdAt);
    }
    if (data?.updatedAt) {
        data.updatedAt = new Date(data.updatedAt);
    }
    return data;
};

export const NotebooksGetResponseModelResponseTransformer: NotebooksGetResponseModelResponseTransformer = data => {
    if (Array.isArray(data?.notebooks)) {
        data.notebooks.forEach(NotebookGetResponseModelResponseTransformer);
    }
    return data;
};

export const ListNotebooksNotebooksGetResponseTransformer: ListNotebooksNotebooksGetResponseTransformer = async (data) => {
    NotebooksGetResponseModelResponseTransformer(data);
    return data;
};

export type CreateNewNotebookNotebooksPostResponseTransformer = (data: any) => Promise<CreateNewNotebookNotebooksPostResponse>;

export type NotebookPostResponseModelResponseTransformer = (data: any) => NotebookPostResponse;

export const NotebookPostResponseModelResponseTransformer: NotebookPostResponseModelResponseTransformer = data => {
    if (data?.createdAt) {
        data.createdAt = new Date(data.createdAt);
    }
    if (data?.updatedAt) {
        data.updatedAt = new Date(data.updatedAt);
    }
    return data;
};

export const CreateNewNotebookNotebooksPostResponseTransformer: CreateNewNotebookNotebooksPostResponseTransformer = async (data) => {
    NotebookPostResponseModelResponseTransformer(data);
    return data;
};