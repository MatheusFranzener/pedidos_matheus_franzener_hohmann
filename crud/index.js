const { initializeApp } = require('firebase/app');
const {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    query,
    getDocs,
    getDoc,
    deleteDoc,
    where
} = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: "AIzaSyDP-galfZaLboWkfAxZiyb9oaI5xX_T9m4",
    authDomain: "pedidosmatheusfranzenerhohmann.firebaseapp.com",
    projectId: "pedidosmatheusfranzenerhohmann",
    storageBucket: "pedidosmatheusfranzenerhohmann.appspot.com",
    messagingSenderId: "120181442026",
    appId: "1:120181442026:web:93c28d75fa01614a635e93",
    measurementId: "G-FTC44YPME2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

async function save(Tablename, id, dado) {
    if (id) {
        const referenceEntity = await setDoc(doc(db, Tablename, id), dado);
        const savedData = {
            ...dado,
            id: id
        }
        return savedData;
    } else {
        const referenceEntity = await addDoc(collection(db, Tablename), dado);
        const savedData = {
            ...dado,
            id: referenceEntity.id
        }
        return savedData;
    }
}

async function get(Tablename) {
    const TableRef = collection(db, Tablename);

    const q = query(TableRef);

    const querySnapshot = await getDocs(q);

    const lista = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);

    });
    return lista;
}

async function getById(Tablename, id) {
    const docRef = doc(db, Tablename, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw new Error("404 - not found");
    }
}

async function remove(Tablename, id) {
    const dado = await deleteDoc(doc(db, Tablename, id));
    return {
        message: `${id} deleted`
    }
}

async function getWithFilter(Tablename, property, operator, value) {
    const TableRef = collection(db, Tablename);

    const q = query(TableRef, where(property, operator, value));

    const querySnapshot = await getDocs(q);

    const lista = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);

    });
    return lista;
}

module.exports = {
    save,
    get,
    getById,
    remove,
    getWithFilter
}