import { useState } from 'react';

/**
 * Session 14/17: State lifting demo — shared temperature state lives in parent.
 */
function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  const scaleNames = { c: 'Celsius', f: 'Fahrenheit' };

  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input
        type="number"
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
      />
    </fieldset>
  );
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) return '';
  return Math.round(convert(input) * 1000) / 1000;
}

function TemperatureCalculator() {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');

  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div>
      <h2>Temperature Calculator</h2>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={(t) => { setScale('c'); setTemperature(t); }}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={(t) => { setScale('f'); setTemperature(t); }}
      />
      <p>
        {parseFloat(celsius) >= 100
          ? 'The water would boil.'
          : 'The water would not boil.'}
      </p>
    </div>
  );
}

export default TemperatureCalculator;
