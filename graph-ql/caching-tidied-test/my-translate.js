// Unlike the one in his video, this package offer free (rather than very cheap) and unlimited translations:
//    https://github.com/matheuss/google-translate-api
// It is also even easier to use.
const translate = require('google-translate-api');

translate('Ik spreek Engels', {to: 'en'}).then(res => {
   console.log(res.text);
   console.log(res.from.language.iso);    // I speak English
}).catch(err => {                         // nl 
   console.error(err);
});

const translateValue = (fieldValue, args) => {
  return args.lang 
          ? translate(fieldValue, {to: args.lang})
            .then(res => res.text)
            .catch(err => `${args.lang} TRANSLATION NOT AVAILABLE`)
          : fieldValue
}

module.exports = { translateValue }
