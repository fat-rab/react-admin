import React from "react";

function SubmitButton(props: any) {
    const {onButtonClick, children} = props;
    // console.log(`${children} updated`);

    return (
        <button onClick={onButtonClick}>{children}</button>
    );
}

export default React.memo(SubmitButton)
