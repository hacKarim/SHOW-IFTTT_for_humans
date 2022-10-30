import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import styles from "./about.module.css";
import remarkGfm from 'remark-gfm'

export default function Stats() {
  const [readmeContent, setReadmeContent] = useState("");

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Guelguin/IFTTT/main/README.md")
      .then((response) => response.text())
      .then((data) => {
        setReadmeContent(data);
      });
  },[readmeContent]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className={styles.placeholder}>{"> vi /README.md"}</div>
        
        <div style={{padding:"20px", maxWidth: "800px", margin:"0 auto", paddingBottom: "100px"}}>
      <ReactMarkdown children={readmeContent} remarkPlugins={[remarkGfm]} />
    </div>
      </motion.div>

  );
}
