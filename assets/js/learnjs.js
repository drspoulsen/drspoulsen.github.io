let dylan = fetch('https://mathstodon.xyz/api/v1/statuses/109351117697201883/');
fetchRes.then(res =>
    res.json()).then(d => {
        console.log(d)
    })