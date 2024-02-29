import { createInstance } from '../requestInstance';
import { baseApiUrl } from '../../config';

const requestRecipe = createInstance({ apiUrl: baseApiUrl });

export { requestRecipe };