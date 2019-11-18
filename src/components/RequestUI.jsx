import React from 'react';

export default function RequestUI(props) {
    let { processing, error, handleRequestClick, handleCancelClick, info } = props;
    
    return(
        <>
           <button onClick={handleRequestClick} disabled={processing}>Create Request</button>
           <button onClick={handleCancelClick}>Cancel request</button>
           {processing && 
               <p>Random name processing...</p>
           }
           <p>
               {
                   error ? 
                   <>
                       {error}
                       <br/>
                       <button onClick={handleRequestClick}>Repeat request</button>
                   </>
                   : 
                   info
               }
           </p>
       </>
   )
}

