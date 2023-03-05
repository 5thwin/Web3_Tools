/// <reference types="react-scripts" />
import { WebsocketProvider } from '@metamask/providers';

declare global {
	interface Window {
		ethereum?: WebsocketProvider;
	}
}
