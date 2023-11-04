export interface Project {
    id: string;
    title: string;
    description: string;
    actions: [];
    apiKeys: [];
    chatEndpoint?: string;
    primaryApiKey?: string;
    userProjects : [];
}