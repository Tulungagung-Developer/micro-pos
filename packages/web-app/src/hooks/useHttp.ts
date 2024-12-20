import { http } from '@libraries/axios';
import useAxios, { configure } from 'axios-hooks';
import { LRUCache } from 'lru-cache';

const cache: any = new LRUCache({ max: 10 });

configure({ axios: http, cache });

export const useHttp = useAxios;
