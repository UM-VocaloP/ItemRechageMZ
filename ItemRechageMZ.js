//=============================================================================
//ItemRechageMZ.js
//=============================================================================
//ver 1.00 2022 JUL 3rd
/*:
 * @target MZ
 * @plugindesc Save and rechage Items num'. ver1.00
 * @author Um
 *
 * @help ItemRechageMZ.js
 * I don't well English. Sory. Sumanu yuruse.
 *
 * @command oboeru
 * @text save Item
 * @desc save Item
 *
 * @command kakidasu
 * @text rechage Item
 * @desc rechage Item
 *
 * @param MaxItemID
 * @type number
 * @min 1
 * @max 9999
 * @default 30
 * @text ItemsID
 * @desc ItemsID default ID#1-#30
 */

/*:ja
 * @target MZ
 * @plugindesc アイテム数を保持したり反映したり ver1.00
 * @author 温州みかん
 *
 * @help ItemRechageMZ.js
 * プラグインコマンドにて、アイテムの所持数を一時的に保持し
 * また、任意に一時的に保存したアイテムの所持数を反映できます
 * セーブファイルには保存されません
 *
 * @command oboeru
 * @text アイテムの所持数を保持
 * @desc アイテムの所有数を一時的に保持します
 *
 * @command kakidasu
 * @text 保持したアイテムの所持数を反映
 * @desc 一時的に保持したアイテムの所有数を反映させます
 *
 * @param MaxItemID
 * @type number
 * @min 1
 * @max 9999
 * @default 30
 * @text アイテムのID
 * @desc 反映させる消費アイテムの管理番号です デフォルトID1～30
 *
 */

(() => {
'use strict'

const pluginName = "ItemRechageMZ";
const parameters = PluginManager.parameters(pluginName);
  const jogen = parameters['MaxItemID'] || '[]';

var shojisu_A = [];

PluginManager.registerCommand(pluginName, "oboeru", args => {
//呼び出されたときの所有数を数列に代入
  for(let i = 1; i < jogen; i++){
    shojisu_A[i] = $gameParty.numItems($dataItems[i]);
  }
});

//保持した各所有数を反映
PluginManager.registerCommand(pluginName, "kakidasu", args => {
  let shojisu_B = [];
  for(let i = 1; i < jogen; i++){
    shojisu_B[i] = $gameParty.numItems($dataItems[i]);
    $gameParty.loseItem($dataItems[i], shojisu_B[i]);
    if(shojisu_A[i] > 0){
      $gameParty.gainItem($dataItems[i], shojisu_A[i]);
    }
  }
});

})();