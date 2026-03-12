export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const API_KEY = process.env.GEMINI_KEY
    const prompt = req.body.prompt

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          contents:[
            {
              role:"user",
              parts:[{text:prompt}]
            }
          ]
        })
      }
    )

    const data = await response.json()

    let reply = "Zenith AI error."

    if(data.candidates && data.candidates.length>0){
      reply = data.candidates[0].content.parts[0].text
    }

    res.status(200).json({reply})

  } catch(err){

    res.status(500).json({error:err.toString()})

  }

}
