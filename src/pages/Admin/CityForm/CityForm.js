import React, { useEffect , useState} from 'react';

const CityForm = ({setIsVisible, currentItem, updateItem}) => {
    const [item, setItem] = useState(currentItem);

    useEffect(()=>{
        setItem(currentItem);
        console.log("useEffect passes current item", currentItem);
    },[currentItem]);

    const onChange = (e) => {
        const {name, value} = e.target;
        setItem({...item, [name]:value})
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log("submit passed the id and item", item);
        updateItem({currentItem}, item);
    }; 
    return (
        <div>
            <form >
                <p>City Section</p>
                    <div >
                    <label>
                        Cover Image
                        <input type="text" name="img" value={item.img} onChange={onChange} />
                    </label>
                    <label>
                        City section
                        <input type="text" name="name" value={item.name} onChange={onChange}/>
                    </label>
                    <label>
                        Members
                        <input type="text" name="members" value={item.members} onChange={onChange}/>
                    </label>
                    </div>
                    <button >Go to edit this page</button>
                    <div >
                        <button type="submit" onClick={submitForm}>Apply</button>
                        <button onClick={()=>setIsVisible(false)}>Cancel</button>
                    </div>
                </form>
        </div>
    );
}

export default CityForm;
