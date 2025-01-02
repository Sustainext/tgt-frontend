import { translateWebpage } from '../utils/domTranslate';

const LanguageSelector = () => {
  const handleLanguageChange = async (e) => {
    const selectedLang = e.target.value;
    await translateWebpage(selectedLang);
  };

  return (
    <div>
      <select onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
