import {
	create,
	findAll,
	findOne,
	update,
	deleteOne,
	deleteAll,
} from './../controllers/deal.controller';

export const routes = (app: {
	post: (arg0: string, arg1: any) => void;
	get: (arg0: string, arg1: any) => void;
	put: (arg0: string, arg1: any) => void;
	delete: (arg0: string, arg1: any) => void;
}) => {
	// Создание нового дела
	app.post('/deals', create);

	// Получение всех дел сразу
	app.get('/deals', findAll);

	//Получение отдельного дела по id
	app.get('/deal/:dealId', findOne);

	// обновить дело по id
	app.put('/deal/:dealId', update);

	//Удалить дело по id
	app.delete('/deal/:dealId', deleteOne);

	// Удалить сразу все дела
	app.delete('/deals', deleteAll);
};
