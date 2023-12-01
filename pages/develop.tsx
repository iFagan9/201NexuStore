import { useState } from "react";
import { Navbar } from "../components/Navbar"
import { useRouter } from "next/router";

const developPage = () => {
    const [name, setAppName] = useState('');
    const [developer, setDeveloperName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [platforms, setPlatforms] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const reviews = 0;
    const ratingTotal = 0;
    const rating = 0;
    const popularity = 0;
    const comments: string[] = [];

    const handleDeveloper = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch('/api/submitApp', {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name, developer, image, rating, description, comments, platforms})
            });

            if(response.ok) {
                alert('Submission Recieved!');
                router.push('/');
            } else {
                alert('Submission Failed!');
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('submission failed', error);
            setError('An Unexpected Error Occured');
        }
    };

    return (
    <>
        <Navbar />
        <div className="content-center text-center">
            <h1 className="bg-slate-500 py-2 text-white font-bold">Submit an Application Request</h1>
            <form onSubmit={handleDeveloper} className="py-4">
                <div className="py-2">
                    <label className="">Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setAppName(e.target.value)}
                        required
                        className="drop-shadow-lg rounded-lg"
                    />
                </div>
                <div className="py-2">
                    <label>Developer: </label>
                    <input
                        type="text"
                        value={developer}
                        onChange={(e) => setDeveloperName(e.target.value)}
                        required
                        className="drop-shadow-lg rounded-lg"
                    />
                </div>
                <div className="py-2">
                    <label>Image Link: </label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                        className="drop-shadow-lg rounded-lg"
                    />
                </div>
                <div className="py-2">
                    <label>Description: </label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="drop-shadow-lg rounded-lg"
                    />
                </div>
                <div className="py-2">
                    <label>Platforms: </label>
                    <select name='platforms' multiple onChange={(e) => setPlatforms(e.target.value)}>
                        <option value='apple'>Apple</option>
                        <option value='android'>Android</option>
                        <option value='windows'>Windows</option>
                    </select>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type='submit' className="bg-green-400 px-2 rounded-lg">Submit</button>
            </form>
        </div>
    </>
    )
};

export default developPage;