import { useState } from 'react'
import './App.css'

function App() {
    const [inputValue, setInputValue] = useState('');
    const [displayValue, setDisplayValue] = useState('');
    const [currentOperation, setCurrentOperation] = useState('');
    const [operationInProgress, setOperationInProgress] = useState(false);
    const [afterEqual, setAfterEqual] = useState(false);

    const appendNumber = (number) => {
        if (operationInProgress) {
            setInputValue('');
            setOperationInProgress(false);
        }
        else if (afterEqual) {
            setInputValue('');
            setAfterEqual(false);
            setDisplayValue('')
            setCurrentOperation('')
        }
        setInputValue((prevValue) => prevValue + number);
    };

    const setOperation = (operation) => {
        if (inputValue === '') return;
        if (afterEqual){
            setDisplayValue('')
            setCurrentOperation('')
        }
        setAfterEqual(false);
        setDisplayValue((prevValue) => prevValue + ` ${inputValue} ${operation}`);
        setCurrentOperation((prevValue) => prevValue + inputValue + operation);
        setInputValue('');
        setOperationInProgress(true);
    };

    const calculateResult = () => {
        if (inputValue === '') return;
        const finalOperation = currentOperation + inputValue;
        let result;
        try {
            result = eval(finalOperation);
            if (finalOperation.includes('/0')) {
                throw new Error('Division by zero');
            }
            setDisplayValue(result.toString());
            setCurrentOperation(result.toString());
            setAfterEqual(true);
        } catch (error) {
            setDisplayValue('Error');
            setCurrentOperation('');
        }
        setInputValue(result.toString());
    };

    const clearInput = () => {
        setInputValue('');
        setDisplayValue('');
        setCurrentOperation('');
    };

    const isNumberKey = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    };

    return (
        <div className="calculator">
            <div id="display" className="display">{displayValue}</div>
            <input
                type="text"
                id="input"
                className="input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={isNumberKey}
                readOnly={true}
            />
            <div className="buttons">
                <button onClick={() => appendNumber('1')}>1</button>
                <button onClick={() => appendNumber('2')}>2</button>
                <button onClick={() => appendNumber('3')}>3</button>
                <button onClick={() => setOperation('+')}>+</button>
                <button onClick={() => appendNumber('4')}>4</button>
                <button onClick={() => appendNumber('5')}>5</button>
                <button onClick={() => appendNumber('6')}>6</button>
                <button onClick={() => setOperation('-')}>-</button>
                <button onClick={() => appendNumber('7')}>7</button>
                <button onClick={() => appendNumber('8')}>8</button>
                <button onClick={() => appendNumber('9')}>9</button>
                <button onClick={() => setOperation('*')}>*</button>
                <button onClick={() => appendNumber('0')}>0</button>
                <button onClick={calculateResult}>=</button>
                <button onClick={clearInput}>C</button>
                <button onClick={() => setOperation('/')}>/</button>
            </div>
        </div>
    );
}

export default App
