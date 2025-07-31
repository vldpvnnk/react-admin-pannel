export default interface AuthorDetail {
    id: number;
    name: string;
    lastName: string;
    secondName: string;
    shortDescription: string;
    description: string;
    avatar: {
        id: number;
        name: string;
        url: string;
    };
    createdAt: string;
    updatedAt: string;
}
