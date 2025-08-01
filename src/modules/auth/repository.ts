import { getSheetData } from '@/lib/googleSheets'

export async function UsersFromSheet() {
  return await getSheetData(process.env.SHEET_ID!, 'bd-users!A2:D')
}
