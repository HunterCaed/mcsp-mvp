fetch("/task")
  .then((res) => res.json())
  .then((data) => {
    console.log("Database", data);
  });
