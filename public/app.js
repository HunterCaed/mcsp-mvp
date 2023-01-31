fetch("/home")
  .then((res) => res.json())
  .then((data) => {
    console.log("Database Data", data);
  });
