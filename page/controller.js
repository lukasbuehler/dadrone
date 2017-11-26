function call(pathname) 
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if(xhr.status === 200)
            {
                console.log(xhr.response); //Outputs a DOMString by default
            }
            else
            {
                // Got error
                console.log(xhr.statusText);
            }
          
        }
      }
    xhr.open('GET', pathname, true);
    xhr.send();

    console.log("calling /"+pathname);
}