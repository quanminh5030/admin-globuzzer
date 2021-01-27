import React, { useEffect , useState} from 'react';
import styles from './ArticleForm.module.css';

const CityForm = ({setShow, currentArticle, updateArticle, coord}) => {
    const [data, setData] = useState(currentArticle);

    useEffect(()=>{
        setData(currentArticle);
        // console.log("useEffect passes current item", currentArticle);
    },[currentArticle]);

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]:value})
    };

    const submitArticle = (e) => {
        e.preventDefault();
        console.log("submit passed the id and item", data);
        updateArticle({currentArticle}, data);
    }; 
    const position = {position: 'relative', bottom: `0px`};
    return (
        <div className={styles.wrapper} style={position}>
            <p className={styles.header}>Articles</p>
            <form className={styles.container}>
                    <div className={styles.fields} >
                    <label>
                        Cover Image
                        <input 
                            type="text" 
                            name="img" 
                            value={data.img}
                            onChange={inputHandler} 
                        />
                    </label>
                    <label>
                        Title
                        <input type="text" name="title" value={data.title} onChange={inputHandler}/>
                    </label>
                    <label>
                        Text
                        <textarea 
                            name="description"
                            className={styles.textarea_input} 
                            value={data.description}
                            rows="4" 
                            cols="65"
                            onChange={inputHandler}
                        />
                    </label>
                    <label>
                        Link of the article
                        <input type="text" name="url" value={data.url} onChange={inputHandler}/>
                    </label>
                    </div> 
                </form>
                <div className={styles.buttons}>
                        <button type="submit" onClick={submitArticle}>Apply</button>
                        <button onClick={()=>setShow(false)}>Cancel</button>
                </div>
        </div>
    );
}

export default CityForm;
