export default function paginate<T>(array: T[], page: number, pageSize: number): T[] {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return array.slice(start, end);
}
