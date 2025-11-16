import express from "npm:express@4.18.2";

const app = express();
app.use(express.json());

const port = 3000;

app.post("/activate", async (req, res) => {
  const auth = req.headers.authorization;

  if (!auth || auth !== `Bearer ${Deno.env.get("CRON_SECRET")}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ message: "Supabase activated" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
