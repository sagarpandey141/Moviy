export function isAtBottom(){
       if (document.documentElement.scrollTop + window.innerHeight + 10 >
        document.documentElement.scrollHeight)
         return true 
        else
          return false
  };