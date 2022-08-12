import React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";

export default function Editor({ currentNote, updateNote }) {
    const [selectedTab, setSelectedTab] = React.useState("write")

    return (
        <section className="pane editor">
            <ReactMde
                /*value={currentNote.body}*/
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(
                      <ReactMarkdown>{markdown}</ReactMarkdown>
                    )
                  }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    )
}
