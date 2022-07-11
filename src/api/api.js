const getRequest = async (reqUrl) => {
    const res = await fetch(reqUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    const json = await res.json();
    return json;
};

export default getRequest;