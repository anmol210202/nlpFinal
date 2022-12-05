import pandas as pd
from numpy import dot
from numpy.linalg import norm

def find__(query):

    df = pd.read_csv('./djangoproj/compoundScores.csv', encoding='utf-8')

    # query = 'Avengers, The'
    # find movie in df
    query_genre = df.loc[df['movie'] == query, 'genre'].iloc[0]
    query_compound = df.loc[df['movie'] == query, 'compound'].iloc[0]
    query_genre = query_genre.split(',')
    query_compound = query_compound.replace('[', '').replace(']', '').split(',')
    query_compound = [float(i) for i in query_compound]

    # create a list of movies with same genre
    movies_with_same_genre = []
    for i in range(0, len(df)):
        genre = str(df['genre'][i]).split(',')
        if set(query_genre).intersection(genre):
            movies_with_same_genre.append(df['movie'][i])
    # remove duplicate movies 
    movies_with_same_genre = list(dict.fromkeys(movies_with_same_genre))
    # print(movies_with_same_genre)

    #  find compound scores of movies with same genre
    def find_compound_scores(movies_with_same_genre):
        compound_scores = []
        for i in range(0, len(movies_with_same_genre)):
            compound = df.loc[df['movie'] == movies_with_same_genre[i], 'compound'].iloc[0]
            compound = compound.replace('[', '').replace(']', '').split(',')
            compound = [float(i) for i in compound]
            compound_scores.append(compound)
        return compound_scores

    # print(find_compound_scores(movies_with_same_genre))

    # find cosine similarity between query and movies with same genre
    def find_cosine_similarity(query_compound, compound_scores):
        cosine_similarity = []
        for i in range(0, len(compound_scores)):
            cosine_similarity.append(dot(query_compound, compound_scores[i])/(norm(query_compound)*norm(compound_scores[i])))
        return cosine_similarity
    # print(find_cosine_similarity(query_compound, find_compound_scores(movies_with_same_genre)))

    # find top 6 movies with same genre
    def find_top_6_movies(cosine_similarity, movies_with_same_genre):
        top_6_movies = []
        for i in range(0, 6):
            top_6_movies.append(movies_with_same_genre[cosine_similarity.index(max(cosine_similarity))])
            cosine_similarity.remove(max(cosine_similarity))
        return top_6_movies

    return find_top_6_movies(find_cosine_similarity(query_compound, find_compound_scores(movies_with_same_genre)), movies_with_same_genre)