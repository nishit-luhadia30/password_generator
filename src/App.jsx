import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  
  const [length, setLength] = useState(4);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const generatePass = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(number) str = str + "0123456789";
    if(character) str = str + "~!@#$%^&*()_+[].,<>:{}|`"

    for(let i=1; i<=length ; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    

    setPassword(pass);

  }, [length, number, character, setPassword]);

  const copypass = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    generatePass()
  }, [length, character, number, generatePass])

  return (
    <div className='bg-gray-700 w-full py-8 px-8 rounded-3xl'>
      <h1 className="text-4xl font-bold text-white pt-3 pb-2">Password Generator</h1>
      <input ref={passRef}
      type="text" value={password} readOnly placeholder='Password' className='text-orange-500 mb-4 w-3/4 text-3xl mt-5 px-3 py-2 rounded-l-lg'/>
      <button onClick={copypass}
      className='text-3xl bg-blue-700 px-3 py-2 rounded-r-lg text-white'>Copy</button>
      <div className='ml-48 flex text-sm gap-x-2'>
        <div className='my-3 flex items-center justify-center gap-x-1'>
          <input type="range" min={4} max={30} value={length} className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}/>
          <label className='text-orange-500 text-xl'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1 ml-3'>
          <input type="checkbox" id='numberInput' defaultChecked={number}
          onChange={() => {
            setNumber((prev) => !prev)
          }}/>
          <label className='text-orange-500 text-xl' htmlFor="numberInput">Number</label>
        </div>
        <div className='flex items-center gap-x-1 ml-3'>
          <input type="checkbox" id='characterInput' defaultChecked={character}
          onChange={() => {
            setCharacter((prev) => !prev)
          }}  />
          <label className='text-orange-500 text-xl' htmlFor="characterInput">Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
