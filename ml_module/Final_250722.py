#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import matplotlib.pyplot as plt
import pickle
import seaborn as sns
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from nltk.tokenize import word_tokenize
import re
import warnings
warnings.filterwarnings("ignore")


# In[2]:


data = pd.read_csv("BBC News.csv")


# In[3]:


def process_text(text):
    text = text.lower().replace('\n',' ').replace('\r','').strip()
    text = re.sub(' +', ' ', text)
    text = re.sub(r'[^\w\s]','',text)
    
    
    stop_words = set(stopwords.words('english')) 
    word_tokens = word_tokenize(text) 
    filtered_sentence = [w for w in word_tokens if not w in stop_words] 
    filtered_sentence = [] 
    for w in word_tokens: 
        if w not in stop_words: 
            filtered_sentence.append(w) 
    
    text = " ".join(filtered_sentence)
    return text


# In[4]:


data['Text_parsed'] = data['Text'].apply(process_text)


# In[5]:


from sklearn import preprocessing 
label_encoder = preprocessing.LabelEncoder() 
data['Category_target']= label_encoder.fit_transform(data['Category']) 


# In[6]:


data.to_csv('BBC_News_processed.csv')


# In[7]:


X_train, X_test, y_train, y_test = train_test_split(data['Text_parsed'], 
                                                    data['Category_target'], 
                                                    test_size=0.2, 
                                                    random_state=8)


# In[8]:


ngram_range = (1,2)
min_df = 10
max_df = 1.
max_features = 300


# In[9]:


tfidf = TfidfVectorizer(encoding='utf-8',
                        ngram_range=ngram_range,
                        stop_words=None,
                        lowercase=False,
                        max_df=max_df,
                        min_df=min_df,
                        max_features=max_features,
                        norm='l2',
                        sublinear_tf=True)
                        
features_train = tfidf.fit_transform(X_train).toarray()
labels_train = y_train
# print(features_train)

features_test = tfidf.transform(X_test).toarray()
labels_test = y_test
# print(features_test.shape)


# In[10]:


from sklearn.ensemble import RandomForestClassifier
model  = RandomForestClassifier(random_state=1)
model.fit(features_train, labels_train)
model_predictions = model.predict(features_test)
# print('Accuracy: ', accuracy_score(labels_test, model_predictions))
# print(classification_report(labels_test, model_predictions))


# In[11]:


model.get_params()


# In[12]:


from sklearn.model_selection import GridSearchCV
n_estimators = [100, 300, 500, 800, 1200]
max_depth = [5, 8, 15, 25, 30]
min_samples_split = [2, 5, 10, 15, 100]
min_samples_leaf = [1, 2, 5, 10] 

hyperF = dict(n_estimators = n_estimators, max_depth = max_depth,  
              min_samples_split = min_samples_split, 
             min_samples_leaf = min_samples_leaf)

gridF = GridSearchCV(model, hyperF, cv = 3, verbose = 1, 
                      n_jobs = -1)
bestF = gridF.fit(features_train, labels_train)


# In[13]:


bestF.best_params_


# In[14]:


from sklearn.ensemble import RandomForestClassifier
model1  = RandomForestClassifier(random_state=1,max_depth= 30, min_samples_leaf= 1, min_samples_split= 2, n_estimators= 100)
model1.fit(features_train, labels_train)
model_predictions = model1.predict(features_test)
# print('Accuracy: ', accuracy_score(labels_test, model_predictions))
# print(classification_report(labels_test, model_predictions))


# In[15]:


import pandas as pd
import numpy as np
import seaborn as sb
import nltk
from nltk.stem import SnowballStemmer
from nltk.tokenize import word_tokenize
from nltk.stem.porter import PorterStemmer


# In[16]:


test = pd.read_csv('LIARtest.csv')
train = pd.read_csv('LIARtrain.csv')


# In[17]:


def Data_Clean():
  print("Processing...")
# Train
  train.isnull().sum()
  train.info()
# Test
  test.isnull().sum()
  test.info()
Data_Clean()
print("Cleaning over..")


# In[18]:


# Saving the original Data for future
train_orig = train.copy()
test_orig = test.copy()


# In[19]:


def stemming(str_tokens, str_stemmer):
  stemmed_str = []
  for token_i in str_token:
    stemmed.append(str_stemmer.stem(token_i))
  return stemmed


# In[20]:


# Data process
def data_process(data, exclude_stopword = True, stem = True):
  str_tokens = [w.lower() for w in data]
  stemmed_tokens = str_tokens
  stemmed_tokens = stemming(str_tokens, eng_stemmer)
  stemmed_tokens = [w for w in stemmed_tokens if w not in stopwords ]  
  return tokens_stemmed


# In[21]:


#creating ngrams
#unigram 
def create_unigram(words):
    assert type(words) == list
    return words
#bigram
def create_bigrams(words):
    assert type(words) == list
    gap = 0
    joinned_str = " "
    Len = len(words)
    if Len > 1:
        lst = []
        for i in range(Len-1):
            for k in range(1,gap+2):
                if i+k < Len:
                    lst.append(joinned_str.join([words[i],words[i+k]]))
    else:
        #set it as unigram
        lst = create_unigram(words)
    return lst


# In[22]:


# Trigram creation
def create_trigrams(words):
    assert type(words) == list
    gap == 0
    joinned_str = " "
    Len = len(words)
    if L > 2:
        lst = []
        for i in range(1,gap+2):
            for k1 in range(1, gap+2):
                for k2 in range(1,gap+2):
                    if i+k1 < Len and i+k1+k2 < Len:
                        lst.append(joinned_str.join([words[i], words[i+k1],words[i+k1+k2]]))
        else:
            #set is as bigram
            lst = create_bigram(words)
    return lst


# In[23]:


porter_str = PorterStemmer()


# In[24]:


def porter_tokenizer(statement):
    return [porter.stem(word) for word in statement.split()]


# In[25]:


from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer, TfidfVectorizer

import nltk
import nltk.corpus
from nltk.tokenize import word_tokenize
from gensim.models.word2vec import Word2Vec
from sklearn.pipeline import Pipeline


# In[26]:


# creating word matrix  with bag of word technique
countV = CountVectorizer()
train_count = countV.fit_transform(train['Statement'].values)
print(countV)
print(train_count)

def countVectorizer_matrix():
        #vocab size
    train_count.shape
    #check vocabulary using below command
    print(countV.vocabulary_)
    #get feature names
    print(countV.get_feature_names()[:25])


# In[27]:


# create tf-df features 
tfidfV = TfidfTransformer()
train_tfidf = tfidfV.fit_transform(train_count)


# In[28]:


def tfidf_matrix():
    train_tfidf.shape
    #get train data feature names 
    print(train_tfidf.A[:10])
#bag of words - with n-grams
#tfidf_ngram  = TfidfTransformer(use_idf=True,smooth_idf=True)
tfidf_ngram = TfidfVectorizer(stop_words='english',ngram_range=(1,4),use_idf = True,smooth_idf = True)


# In[29]:


# Tags
nltk.download('averaged_perceptron_tagger')
tagged_sentences = nltk.corpus.treebank.tagged_sents()
cutoff = int(.75 * len(tagged_sentences))
training_sentences = train['Statement']


# In[30]:


def features_Scale(sentence, index):
    """ sentence: [w1, w2, ...], index: the index of the word """
    return {
        'word': sentence[index],
        'is_first': index == 0,
        'is_last': index == len(sentence) - 1,
        'is_capitalized': sentence[index][0].upper() == sentence[index][0],
        'is_all_caps': sentence[index].upper() == sentence[index],
        'is_all_lower': sentence[index].lower() == sentence[index],
        'prefix-1': sentence[index][0],
        'prefix-2': sentence[index][:2],
        'prefix-3': sentence[index][:3],
        'suffix-1': sentence[index][-1],
        'suffix-2': sentence[index][-2:],
        'suffix-3': sentence[index][-3:],
        'prev_word': '' if index == 0 else sentence[index - 1],
        'next_word': '' if index == len(sentence) - 1 else sentence[index + 1],
        'has_hyphen': '-' in sentence[index],
        'is_numeric': sentence[index].isdigit(),
        'capitals_inside': sentence[index][1:].lower() != sentence[index][1:]
    }


# In[31]:


class MeanEmbeddingVectorizer(object):
    def __init__(self, word2vec):
        self.word2vec = word2vec
        # if a text is empty we should return a vector of zeros
        # with the same dimensionality as all the other vectors
        self.dim = len(word2vec.itervalues().next())
    def fit(self, X, y):
        return self
    def transform(self, X):
        return np.array([
            np.mean([self.word2vec[w] for w in words if w in self.word2vec]
                    or [np.zeros(self.dim)], axis=0)
            for words in X
        ])


# In[32]:


from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import learning_curve,  GridSearchCV
from sklearn.metrics import precision_recall_curve, average_precision_score
from sklearn.pipeline import Pipeline
from sklearn.linear_model import SGDClassifier
from sklearn.ensemble import RandomForestClassifier
#from sklearn.model_selection import KFold
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import learning_curve
import matplotlib.pyplot as plt
from sklearn.metrics import precision_recall_curve
from sklearn.metrics import average_precision_score


# In[33]:


#string to test
statement_doc = ['We are already almost halfway to our 2010 goal of creating 700,000 new jobs in seven years.']


# In[34]:


#Random Forest
random_forest = Pipeline([
        ('rfCV',countV),
        ('rf_clf',RandomForestClassifier(n_estimators=350,n_jobs=3))
        ])
print("Accuracy: ")    
random_forest.fit(train['Statement'],train['Label'])
predicted_rf = random_forest.predict(test['Statement'])
np.mean(predicted_rf == test['Label'])


# In[35]:


import matplotlib.pyplot as plt
import numpy as np
import keras
from keras import backend as K
from keras.utils import np_utils
from keras.models import Sequential
from keras.layers import Dense, Dropout, LSTM, Embedding, Input, RepeatVector
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split


# In[36]:


import numpy as np
import nltk
from sklearn.feature_extraction.text import CountVectorizer
import itertools
import pickle
Var = input("Enter the news text you want to test or verify: ")
def classify_fake_news(Var):    
    load_model = pickle.load(open('Model.sav', 'rb'))
    features_test = tfidf.transform([Var]).toarray()
    return print("The category of the news is:",str(list(model1.predict(features_test))[0]).replace('0', 'Business').replace('1', 'Entertainment').replace('2', 'Politics').replace('3', 'Sport').replace('4', 'Tech'))
#if __name__ == '__main__':
classify_fake_news(Var)
#import pickle
#var = input("Enter the news text you want to test or verify: ")
#print("Your Entry: " + str(var))
# Here we go with the prediction:
def detecting_fake_news(Var):    
    load_model = pickle.load(open('Model.sav', 'rb'))
    prediction = load_model.predict([Var])
    prob = load_model.predict_proba([Var])
    return (print("Folowing Statement predicted as:  ",prediction[0]),
        print("The truth probability score will be:  ",prob[0][1]))
if __name__ == '__main__':
    detecting_fake_news(Var)


# In[37]:


import numpy as np
import nltk
from sklearn.feature_extraction.text import CountVectorizer
import itertools
import pickle
Var = input("Enter the news text you want to test or verify: ")
def classify_fake_news(Var):    
    load_model = pickle.load(open('Model.sav', 'rb'))
    features_test = tfidf.transform([Var]).toarray()
    return print("The category of the news is:",str(list(model1.predict(features_test))[0]).replace('0', 'Business').replace('1', 'Entertainment').replace('2', 'Politics').replace('3', 'Sport').replace('4', 'Tech'))
#if __name__ == '__main__':
classify_fake_news(Var)
#import pickle
#var = input("Enter the news text you want to test or verify: ")
#print("Your Entry: " + str(var))
# Here we go with the prediction:
def detecting_fake_news(Var):    
    load_model = pickle.load(open('Model.sav', 'rb'))
    prediction = load_model.predict([Var])
    prob = load_model.predict_proba([Var])
    return (print("Folowing Statement predicted as:  ",prediction[0]),
        print("The truth probability score will be:  ",prob[0][1]))
if __name__ == '__main__':
    detecting_fake_news(Var)


# In[ ]:




