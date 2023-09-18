import cors from "cors"
import express from "express"

import { convert } from "./convert.js"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"

const port = process.port.env.PORT || 3333

const app = express()

app.use(express.json())
app.use(cors())

app.get("/summary/:id", async (request, response) => {
  try {
    const idUrl = request.params.id

    await download(idUrl)
    const audioConverted = await convert()

    const result = await transcribe(audioConverted)

    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    console.error(error)
    return response.json({ error })
  }
})

app.listen(port, () => console.log("Servidor rodando na porta 3333"))
