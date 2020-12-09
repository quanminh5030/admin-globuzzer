import React from 'react';

const CityForm = ({setIsVisible, name, img, members, setImg, setName,setMembers, updateForm}) => {

    return (
        <div>
            <form >
                <p>City Section</p>
                    <div >
                    <label>
                        Cover Image
                        <input type="text" name="img" value={img} onChange={(e)=>setImg(e.target.value)} />
                    </label>
                    <label>
                        City section
                        <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </label>
                    <label>
                        Members
                        <input type="text" name="members" value={members} onChange={(e)=>setMembers(e.target.value)}/>
                    </label>
                    </div>
                    <button >Go to edit this page</button>
                    <div >
                        <button type="submit" onClick={updateForm}>Apply</button>
                        <button onClick={()=>setIsVisible(false)}>Cancel</button>
                    </div>
                </form>
        </div>
    );
}

export default CityForm;
