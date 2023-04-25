function Home() {
    console.log(123)
    // const [count1, setCount1] = useState(0);
    // const [count2, setCount2] = useState(0);
    //
    // const handleAdd1 = () => {
    //     setCount1(count1 + 1);
    // }
    //
    // // 调用 useCallback 返回一个 memoized 回调，该回调在依赖项更新时才会更新
    // const handleAdd2 = useCallback(() => {
    //     setCount2(count2 + 1);
    // }, [count2]);

    return (
        <>
            home
            {/*<div>*/}
            {/*    <p>count1: {count1}</p>*/}
            {/*    <SubmitButton onButtonClick={handleAdd1}>button1</SubmitButton>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <p>count2: {count2}</p>*/}
            {/*    <SubmitButton onButtonClick={handleAdd2}>button2</SubmitButton>*/}
            {/*</div>*/}
        </>
    )
}

export default Home



