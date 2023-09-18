//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { conn } from "./src/db";
import app from "./src/app";

// Syncing all the models with the database.
conn.sync().then(() => {
  const port = 3002;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});


// conn.sync({ force: true }).then(() => {
//   const port = 3002;
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// });
