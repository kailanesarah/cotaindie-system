export async function getRangeSheet(range: string, rowIndex: number) {

    const match = range.match(/^(.*?)!([A-Z]+)(\d+)(?::([A-Z]+)(\d+)?)?$/);

    if (!match) {
        throw new Error("Range inválido. Use formato como 'Sheet1!A2:M'");
    }

    const sheetName = match[1];
    const colStart = match[2];
    const rowStart = Number(match[3]);
    const colEnd = match[4] || colStart;
    const rowEnd = match[5] ? Number(match[5]) : rowStart;

    const updateRange = `${sheetName}!${colStart}${rowIndex + rowStart}:${colEnd}${rowIndex + rowStart}`;
    return updateRange;
}