from django.shortcuts import render



def plan(request): return render(request, 'page/Planning.html')

def dev(request): return render(request, 'page/Development.html')

def sour(request): return render(request, 'page/Sources.html')