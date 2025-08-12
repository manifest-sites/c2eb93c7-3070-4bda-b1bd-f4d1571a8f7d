import { useState } from 'react'
import { Button } from 'antd'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDot = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const buttonStyle = "h-16 text-xl font-semibold"
  const numberButtonStyle = buttonStyle + " bg-orange-100 hover:bg-orange-200 border-orange-300 text-orange-900"
  const operatorButtonStyle = buttonStyle + " bg-orange-500 hover:bg-orange-600 text-white border-orange-600"
  const specialButtonStyle = buttonStyle + " bg-orange-300 hover:bg-orange-400 border-orange-400 text-orange-900"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">Calculator</h1>
        
        <div className="bg-orange-50 rounded-lg p-4 mb-6 border-2 border-orange-200">
          <div className="text-right text-3xl font-mono text-orange-900 overflow-hidden">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Button 
            className={specialButtonStyle}
            onClick={clear}
          >
            C
          </Button>
          <Button className={specialButtonStyle}>±</Button>
          <Button className={specialButtonStyle}>%</Button>
          <Button 
            className={operatorButtonStyle}
            onClick={() => performOperation('/')}
          >
            ÷
          </Button>

          <Button 
            className={numberButtonStyle}
            onClick={() => inputNumber(7)}
          >
            7
          </Button>
          <Button 
            className={numberButtonStyle}
            onClick={() => inputNumber(8)}
          >
            8
          </Button>
          <Button 
            className={numberButtonStyle}
            onClick={() => inputNumber(9)}
          >
            9
          </Button>
          <Button 
            className={operatorButtonStyle}
            onClick={() => performOperation('*')}
          >
            ×
          </Button>

          <Button 
            className={numberButtonStyle}
            onClick={() => inputNumber(4)}
          >
            4
          </Button>
          <Button 
            className={numberButtonStyle}
            onClick={() => inputNumber(5)}
          >
            5
          </Button>
          <Button 
            className={numberButtonStyle}
            onClick={() => inputNumber(6)}
          >
            6
          </Button>
          <Button 
            className={operatorButtonStyle}
            onClick={() => performOperation('-')}
          >
            −
          </Button>

          <Button 
            className={numberButtonStyle}
            onClick={() => inputNumber(1)}
          >
            1
          </Button>
          <Button 
            className={numberButtonStyle}
            onClick={() => inputNumber(2)}
          >
            2
          </Button>
          <Button 
            className={numberButtonStyle}
            onClick={() => inputNumber(3)}
          >
            3
          </Button>
          <Button 
            className={operatorButtonStyle}
            onClick={() => performOperation('+')}
          >
            +
          </Button>

          <Button 
            className={numberButtonStyle + " col-span-2"}
            onClick={() => inputNumber(0)}
          >
            0
          </Button>
          <Button 
            className={numberButtonStyle}
            onClick={inputDot}
          >
            .
          </Button>
          <Button 
            className={operatorButtonStyle}
            onClick={handleEquals}
          >
            =
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Calculator