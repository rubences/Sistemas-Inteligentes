"""Run the same behavioural tests against student.py. Initially expected to fail."""
import sys
import unittest
import student
import test_algorithms

test_algorithms.impl=student
result=unittest.TextTestRunner(verbosity=2).run(unittest.defaultTestLoader.loadTestsFromModule(test_algorithms))
sys.exit(not result.wasSuccessful())
