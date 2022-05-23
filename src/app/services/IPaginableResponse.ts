interface PaginationMetadata {
    total: number;
    pages: number;
    itemsPerPage: number;
}

export default interface IPaginableResponse<T>
{
    items: T[];
    metadata: PaginationMetadata;
}
