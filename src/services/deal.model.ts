  // конструктор нашего дела
  // @ts-nocheck
import sql from '../common/mysqlConnector'
  
  const Deal = function(deal) {
    this.text = deal.text;
    this.inner_key = deal.inner_key;
  };
  //у нашей модели будут функции, с помощью которых можно осуществлять все операции CRUD, которые были озвучены в начале статьи:
  Deal.create = (newDeal, result) => {
    sql.query("INSERT INTO DEALS SET ?", newDeal, (err, res) => {
      //операция вставки из SQL
      if (err) {
        console.log("error: ", err);
        result(err, null);
        //немного бедная обработка ошибок, но на первое время хватит
        return;
      }
  
      console.log("Дело сделано", { id: res.insertId, ...newDeal });
      result(null, { id: res.insertId, ...newDeal });
    });
  };

  Deal.findById = (dealId, result) => {
    sql.query(`SELECT * FROM TODO WHERE inner_key = '${dealId}'`, (err, res) => {
  
    // здесь обработка ошибок, не вижу смысла ее дублировать
  
      if (res.length) {
        console.log("найдено дело: ", res[0]);
        result(null, res[0]);
        return;
      }
      // если вдруг не удалось найти
      result({ kind: "not_found" }, null);
    });
  };

  Deal.getAll = result => {
    // здесь я немного переписал по сравнению с предыдущим разом
    // я хочу из базы данных только текст и inner_key, сам id из базы данных я забирать не хочу
    const queryAll = "SELECT text, inner_key FROM DEALS";
   sql.query(queryAll, (err, res) => {
     if (err) {
       console.log("error: ", err);
       result(null, err);
       return;
     }
 
     console.log("deals: ", res);
     result(null, res);
   });
 };

export default Deal