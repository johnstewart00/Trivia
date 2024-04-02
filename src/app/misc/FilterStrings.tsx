export const FilterString = (str: string) => {
  str = str.replace(/&#039;/g, "'");
  str = str.replace(/&quot;/g, '"');
  str = str.replace(/&shy;/g, "-");
  str = str.replace(/&amp;/g, "&");
  str = str.replace(/&ouml;/g, "Ö");
  str = str.replace(/&auml;/g, "ä");
  str = str.replace(/&aring;/g, "Ä");
  str = str.replace(/&.*?;/g, ""); // this should just delete anything else
  return str;
};

export const FilterAnswers = (answers: any) => {
  for (let i = 0; i < answers.length; i++) {
    answers[i] = FilterString(answers[i]);
  }
  return answers;
};

export function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
