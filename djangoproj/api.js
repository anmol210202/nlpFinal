useEffect(() => {
    fetch("http://127.0.0.1:8000/score/", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
      //make sure to serialize your JSON body
      body: JSON.stringify({
        data: "Avengers, The"
      })
    }).then( (response) => response.json()).then((data) => {
      data = JSON.parse(data.data);
      console.log(data);
    });
  
   
  }, [])
  