import { getSheetData, appendSheetData } from '@/lib/googleSheets'

export async function GetClients() {
  return await getSheetData(process.env.SHEET_ID!, 'bd-clients!A2:M')
}

export async function AppendClients(values : any[][]){
    await appendSheetData(process.env.SHEET_ID!, 'bd-clients!A2:M', values)

}
