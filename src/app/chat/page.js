"use client";

import {Button, TextArea} from "@carbon/react";

export default function RepoPage() {
  return <div className={"grid_container"}>
    <div className={"left_column"}>
    </div>
    <div>
      <div className={"chat_section"}>
      </div>
      <TextArea className={"text_input_section"} labelText={"Enter text"}>

      </TextArea>
      <div className={"submit_button_section"}>
        <Button id={"submit_button"}>
          Submit
        </Button>
      </div>
    </div>
    <div className={"right_column"}>
    </div>
  </div>
}
