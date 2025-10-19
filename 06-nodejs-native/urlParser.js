function parseURL(url) {
  const obj = new URL(url);

  const hostParts = obj.hostname.split(".");
  const domainName = hostParts.slice(-2).join(".");
  const subDomain = hostParts.length > 2 ? hostParts.slice(0, -2).join(".") : "";

  const folders = obj.pathname.split("/").filter(Boolean);
  const targetFile = folders.pop() || "";
  const folderTree = folders.join("/");

  return {
    protocol: obj.protocol.replace(":", ""),
    ipAddress: obj.hostname.match(/\d+\.\d+\.\d+\.\d+/) ? obj.hostname : null,
    subDomain,
    domainName,
    folderTree,
    targetFile,
    argumentsFile: obj.search ? obj.search.substring(1) : ""
  };
}

console.log(parseURL("https://blog.ejemplo.com/carpeta1/carpeta2/archivo.html?x=1&y=2"));
