import './App.css'
import {
  DB3BrowserWallet,
  DB3Client
} from 'db3.js'
import { useState } from 'react'
import { useAsyncFn } from 'react-use'

export default function App() {
  const mnemonic =
    'result crisp session latin must fruit genuine question prevent start coconut brave speak student dismiss'
  const wallet = DB3BrowserWallet.createNew(mnemonic, 'DB3_SECP256K1')
  const client = new DB3Client('https://grpc.devnet.db3.network', wallet)
  const [database, setDatabase] = useState('')
  const [res2, createDatabase] = useAsyncFn(async () => {
    try {
      const [dbid, txid] = await client.createDatabase()
      setDatabase(dbid)
    } catch (e) {
      console.log(e)
    }
  }, [client])
  if (database.length == 0) {
    createDatabase()
  }
  return (
    <main>
      <h1>{database}</h1>
    </main>
  )
}