export const isAtbottom = () => {
       if (document.documentElement.scrollTop + window.innerHeight + 10 >
        document.documentElement.scrollHeight)
        {console.log("true")
         return true }
        else
         {console.log("false") 
          return false}
  };