import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useRemovalConfirm = (onSubmit) => {
	const dispatch = useDispatch();

	const [loginregisterModalState, setloginregisterModalState] = useState(false);
	const [removalModalState, setremovalModalState] = useState(false);
	const [removalFav, setremovalFav] = useState('');

	const removalToggle = (id) => {
		setremovalModalState(!removalModalState);
		setremovalFav(id);
	};

	const loginToggle = () => {
		setloginregisterModalState(!loginregisterModalState);
	};

	const onRemovalSubmit = () => {
		dispatch(unFavoriteProfile(removalFav));
		setremovalModalState(!removalModalState);
	};

	const onDeleteHome = () => {
		onSubmit(removalFav);
		setremovalModalState(!removalModalState);
	};

	const onConfirmDelete = () => {
		onSubmit();
	};

	return {
		removalModalState,
		removalToggle,
		onRemovalSubmit,
		removalFav,
		onDeleteHome,
		onConfirmDelete,
		loginToggle,
		loginregisterModalState,
	};
};

export default useRemovalConfirm;
