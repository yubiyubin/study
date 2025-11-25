//

const solution = (skill, skill_trees) => {
  for (let j = 0; j < skill_trees.length; j++) {
    let currMaxLevel = 0;
    const currSkillTree = skill_trees[j];
    let sum = 0;

    for (let i = 0; i < skill.length; i++) {
      const currSkill = skill[i];
      const currSkillLevel = currSkill.indexOf(currSkill);
      //1.트리에 없는 스킬인 경우- continue
      //2.트리에 있는 스킬인 경우
      if (currSkillLevel !== -1) {
        //2-1.현재 가능한 스킬인 경우
        if (currSkillLevel === currMaxLevel) {
          //2-1-1. 최고 레벨 스킬인 경우
          currMaxLevel += 1;
        }
        //2-2.현재 불가능한 스킬인 경우
        if (currSkillLevel > currMaxLevel) {
          break;
        }
      }
      if (i === skill.length - 1) {
        sum += 1;
      }
    }
  }
  return sum;
};
console.log(solution("CBD", ["BACDE", "CBADF", "AECB", "BDA"]));
