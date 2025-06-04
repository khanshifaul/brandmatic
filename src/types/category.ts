export interface Category {
    _id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    parentId?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}